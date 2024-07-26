import os
import json
import boto3
from pyspark.sql import SparkSession
import sys
from pyspark.sql import SparkSession
from pyspark.sql.functions import explode, split, col, format_number, explode_outer ,regexp_replace, when

def handler(event, context):
    
    StepWiseBreakdown= event['StepWiseBreakDown']
    NetworkLogs= event['NetworkLog_Data']
    StepLogs = event['StepLog_Data']
    StoryID= event['StoryID']

    # Initialize S3 client
    s3 = boto3.client('s3')

    # Initialize Spark session
    spark = SparkSession.builder.appName('S3Processing').getOrCreate()

    # Download the raw data from S3
    #local_input_path = f'/{object_key.split("/")[-1]}'
    #s3.download_file(bucket_name, object_key)

    df = spark.read.json('StepLogs')

    df=df.select("StepNo","WidgetInfo", "LogMode")
    df=df.select("StepNo",explode_outer("WidgetInfo").alias("WidgetInfo"),"LogMode")
    df=df.select('StepNo', "WidgetInfo.*","LogMode")
    df_exploded = df.select('StepNo',"startTime","duration","identifier","customInfo.*","LogMode")
    

    # Define the regular expression pattern for the delimiters
    delimiter_pattern="[_W-]"

    # Split the strings based on the delimiter pattern
    split_col=split(df_exploded["identifier"],delimiter_pattern)

    # Extract the delimited strings
    #df_exploded = df_exploded.withColumn('render', split_col.getItem(0))
    df_exploded = df_exploded.withColumn('WidgetType', split_col.getItem(1))

    df_exploded = df_exploded.withColumn('EventHandler', split_col.getItem(3))

    df_exploded=df_exploded.drop("identifier")
    df_exploded = df_exploded.withColumn("EventHandler", when(col("EventHandler").rlike("\\d"), None).otherwise(col("EventHandler")))
    df_exploded=df_exploded.select("StepNo","StartTime","Duration","WidgetType","widgetTitle","EventHandler","LogMode")

    ##s3 bucket location as output path
    # Save processed data back to S3
    path = f's3://gen-bi-test-storage/output/STORIES_ID/{StoryID}/RAW/StepLogs/PROCESSED/'

    df_exploded.to_csv(path, index=False)

    return "Image run!",df_exploded,{
        'statusCode': 200,
        'body': json.dumps(f'Processed data uploaded to {path}')
    }
