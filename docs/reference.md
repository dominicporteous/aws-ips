# Command Reference
Note: This is not an exauhstive list, and entries may be missing or incomplete.

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


