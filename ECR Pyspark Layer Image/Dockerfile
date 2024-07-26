FROM public.ecr.aws/lambda/python:3.10

# Copy requirements.txt
COPY requirements.txt ./ 

RUN apt-get update && apt-get install -y \
    openjdk-11-jdk
    
# Install the specified packages
RUN pip install -r requirements.txt

# Copy function code
COPY lambda_function.py ./

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "lambda_function.handler" ]