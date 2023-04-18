export default {
  name:'comment',
  type:'document',
  title:"Comment",
  fields:[
    {
      name: 'name',
      type:'string',
      title:"Comment"
    },
    {
      name: 'approved',
      type:'boolean',
      title:"Approved",
      description:"Comment won't show on the site withour approval",
    },
    {name: "email", type:"string"},
    {name: "comment", type:"text"},
    {name: "post", type:"reference", to:[{type:'post'}]},
  ]
}