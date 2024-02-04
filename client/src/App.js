import './App.css';
import{useEffect, useState} from 'react';
import axios from 'axios';
import FormData from './components/form';
axios.defaults.baseURL ='http://localhost:8080/'
function App() {

  const [addSection,setAddSection] = useState(false);
  const [editSection,setEditSection] = useState(false);

  const [formData,setData] = useState({
    name:"",
    email:"",
    mobile:"",
  })

  const [formDataEdit,setDataEdit] = useState({
    name:"",
    email:"",
    mobile:"",
    _id:"",
  })

  const [dataList,setDataList] = useState([])
  const getandFetch = async()=>{
    const data = await axios.get("/")
    console.log(data)
    if(data.data.success){
      setDataList(data.data.data)
    }
  }
  useEffect(()=>{
    getandFetch()
  },[])
  console.log(dataList)
  const handleOnchange = (e) =>{
    const {value,name} = e.target
    setData ((preev)=>{
      return{
        ...preev,
        [name] : value,
      }
    })

  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const data = await axios.post("/create",formData)
    console.log(data)
    if(data.data.success){
      setAddSection(false)
      alert(data.data.message)
    }
  }
  
  const handleDelete = async(e)=>{
    const data = await axios.delete("/delete/"+e)
    alert(data.data.message)
    if(data.data.success){
      getandFetch()
    }
  }
  const handleUpdate = async(id)=>{
      setDataEdit(id)
      setEditSection(true);
  }
  const handleeditOnchange = (e) =>{
    const {value,name} = e.target
    setDataEdit ((preev)=>{
      return{
        ...preev,
        [name] : value,
      }
    })
  }
  const handleEdit = async(e)=>{
      e.preventDefault()
      const data = await axios.put("/update",formDataEdit)
      if(data.data.success){
        setEditSection(false)
        alert(data.data.message)
      }
  }
  return (
    <>
    <div className="form">
      <button className="btn" onClick={()=>setAddSection(true)}>Add </button>
      {
        addSection &&(  
          <FormData
            handleSubmit={handleSubmit}
            handleOnchange={handleOnchange}
            handleClose={()=>setAddSection(false)}
            rest={formData}
          ></FormData>
        )
      }
      {
        editSection&& (
          <FormData
            handleSubmit={handleEdit}
            handleOnchange={handleeditOnchange}
            handleClose={()=>setEditSection(false)}
            rest={formDataEdit}
          ></FormData>
        )
      }
        <table>
            <thead>
                <tr>

                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
            </thead>
            <tbody>
              {
                (dataList[0])?(
                dataList.map((el)=>{
                  return(
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td><button className='btn' onClick={()=>handleDelete(el._id)}>Delete</button></td>
                      <td><button className='btn' onClick={()=>handleUpdate(el)}>Update</button></td>
                    </tr>
                  )
                })
                ):<p>NO Data Available</p>
              }
              </tbody>

      </table>

    </div>
    </>
  );
}

export default App;
