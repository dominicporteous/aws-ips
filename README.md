# aws-ips
A command line tool to fetch the latest AWS ip ranges, with optional filters for service and or region

## How to use

```

$ npm i aws-ips -g
$ aws-ips --service ROUTE53_HEALTHCHECKS --region eu-west-1

Region    Service              IP Range         
eu-west-1 ROUTE53_HEALTHCHECKS 54.228.16.0/26   
eu-west-1 ROUTE53_HEALTHCHECKS 176.34.159.192/26

```

# Command Reference
Note: This is not an exauhstive list, and entries may be missing or incomplete.

Generated with [yargs-reference](https://www.npmjs.com/package/yargs-reference)

----

### Command
`aws-ips`

### Description
A command line tool to fetch the latest AWS ips, with optional filters for service and or region

### Options
| Option Name | Description | Type | Required | Default Value |
| :--- | :------------ | :---: | :---: | :---: |
| pretty | Show pretty table | boolean | false | false |
| region | Filter for a particular AWS region | string | false | <none> |
| service | Filter for a particular AWS service | string | false | <none> |
| sort | Results sorting (Choices: [region,service,cidr]) | string | false | region |
| reverse | Reverse sort order | boolean | false | false |

----


Please see the reference file for advanced information. [Command Reference](./docs/reference.md)
