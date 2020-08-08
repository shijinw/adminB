 <template>

   <div class="tree-menu">

     <div>{{ label }}</div>

     <tree-menu
       v-for="(node,key) in nodes"
       :nodes="node.nodes"
       :label="node.label"
       :key="key"
     >

     </tree-menu>

   </div>

 </template>

<script>

export default {

  props: [ 'label', 'nodes' ],

  name: 'tree-menu'

}

</script>
