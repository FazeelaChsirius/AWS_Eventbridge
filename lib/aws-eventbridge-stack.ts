import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as events from "@aws-cdk/aws-events";
import * as targets from "@aws-cdk/aws-events-targets";
import { Rule } from 'aws-cdk-lib/aws-events';
import { TargetTrackingScalingPolicy } from 'aws-cdk-lib/aws-applicationautoscaling';

export class AwsEventbridgeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const producerFn = new lambda.Function(this, "producerLambda", {
      functionName:"Producer",
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset(("lambda")),
      handler: "producer.handler",
    });

    events.EventBus.grantAllPutEvents(producerFn);

    const consumerFn = new lambda.Function(this, "consumerLambda", {
      functionName: "Consumer",
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "consumer.handler",
    });

    const rule = new events.Rule(this, "EventRule", {
      targets: [new targets.LambdaFunction(consumerFn)],
      eventPattern: {
        source: ["orderService"],
        detailType: ["Addorder"],
        detail: {
          price: ["21","56","33"],
        }
      },
    
    });
 
  }
}
