<template>

   <div class="tree-menu">

     <tree-menu v-for="(tree,key) in nodes" :key="key" :label="tree.label" :nodes="tree.nodes"></tree-menu>
</div>
 </template>
<script>
import treeMenu from '../argu-page/tree-menu.vue'
export default {
  components: {
    treeMenu
  },
  data () {
    return {
      nodes: [
        {

          label: 'root',

          nodes: [

            {

              label: 'item1',

              nodes: [

                {

                  label: 'item1.1'

                },

                {

                  label: 'item1.2',

                  nodes: [

                    {

                      label: 'item1.2.1'

                    }

                  ]

                }

              ]

            },

            {

              label: 'item2',
              nodes: [

                {

                  label: 'item1.1'

                },

                {

                  label: 'item1.2',

                  nodes: [

                    {

                      label: 'item1.2.1'

                    }

                  ]

                }

              ]
            }

          ]

        }
      ]

    }
  }
}
</script>
