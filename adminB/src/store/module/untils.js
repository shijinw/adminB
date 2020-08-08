import { SecNoViList } from '@/api/course'


export default {
  state: {
    Draglist: [],
    form: {
        page: 1,
        limit: 8,
        project_id: '',
        major_id: '',
        class_id: '',
        id: '',
       
      },
   
  },
  mutations: {
  
     
  },
  actions: {
      //获取拖拽组件数据
    getDraglist ({ state },videofrom) {
      let obj=state.form
        if(videofrom) {
          obj=videofrom
        }

        
        return new Promise((resolve, reject) => {
            SecNoViList(obj).then(res => {
            const rep = res.data
            if(rep.code===200){           
            resolve(rep.data.data)
            }
          }).catch(err => {
            reject(err)
          })
        })
      },
    

  }
}
