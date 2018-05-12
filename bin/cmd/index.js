module.exports = {
  context: 'aws-ips',
  command: '*',
  desc: 'A command line tool to fetch the latest AWS ips, with optional filters for service and or region',
  builder: {
    pretty: {
      description: 'Show pretty table',
      type: 'boolean',
      default: false,
      required: false
    },
    region: {
      description: 'Filter for a particular AWS region',
      type: 'string',
      required: false
    },
    service: {
      description: 'Filter for a particular AWS service',
      type: 'string',
      required: false
    },
    sort: {
      description: 'Results sorting',
      type: 'string',
      choices: ['region','service','cidr'],
      default: 'region',
      required: false
    },
    reverse: {
      description: 'Reverse sort order',
      type: 'boolean',
      default: false,
      required: false
    },
  },
  handler: async (argv) => {

    const opts = argv

    opts.sort = (opts.sort=='cidr' ? 'ip_prefix' : opts.sort)

    const dl = require('download-file-sync')
    const json = dl('https://ip-ranges.amazonaws.com/ip-ranges.json')

    const ips = require('json-try-parse')(json)
    if(!ips){  throw Error('Unable to fetch IP file from AWS. Please check https://ip-ranges.amazonaws.com/ip-ranges.json') }

    const tableOpts = (opts.pretty ? {
      chars: { 'top': '═' , 'top-mid': '╦' , 'top-left': '╔' , 'top-right': '╗'
             , 'bottom': '═' , 'bottom-mid': '╩' , 'bottom-left': '╚' , 'bottom-right': '╝'
             , 'left': '║' , 'left-mid': '╠' , 'mid': '═' , 'mid-mid': '╬'
             , 'right': '║' , 'right-mid': '╣' , 'middle': '║' }
    } : {
      chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
           , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
           , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
           , 'right': '' , 'right-mid': '' , 'middle': ' ' },
      style: { 'padding-left': 0, 'padding-right': 0 }
    })
    const Table = require('cli-table')

    let res = new Table(
        Object.assign({
            head: ['Region', 'Service', 'IP Range']
        }, tableOpts)
    )

    let list = ips.prefixes.filter(function( i ){
      let r = true
      if(opts.service){
          if(i.service.toLowerCase() != opts.service.toLowerCase()){
              r = false
          }
      }
      if(opts.region){
          if(i.region.toLowerCase() != opts.region.toLowerCase()){
              r = false
          }
      }
      return r
    })

    const arraySort = require('array-sort')
    arraySort(list,opts.sort,{reverse: opts.reverse})

    list.forEach(function( i ){
        res.push([ i.region.trim(), i.service.trim(), i.ip_prefix.trim() ])
    })

    console.log('')
    console.log(res.toString())
    console.log('')

  }
}
