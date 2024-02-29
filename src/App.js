import './App.css';
import R from 'react'

function App() {
  const textInpute = R.useRef(null);
  const dateInpute = R.useRef(null);
  const [state ,setState] = R.useState([])
  const [id ,setId] = R.useState(0)
  const [bgc ,setbgc] = R.useState(0)
  // R.useEffect(()=>{
  //   console.log(state)
  // },[])

  const handleClick = ()=>{
    let text = textInpute.current.value ;
    if(text){
    let timeCo = dateInpute.current.value.split(':');
    console.log(timeCo)

    if(timeCo[0] > 12){
      timeCo[0] -= 12;
      timeCo[0] = `0${timeCo[0]}` 
      timeCo[2] = 'PM'
    }else if(timeCo[0] <= 12){
      timeCo[2] = 'AM'
    }
    let TrueTIME = timeCo[0] === '' ? 'No Time Added' : `${timeCo[0]}:${timeCo[1]} ${timeCo[2]}` ;
    console.log(TrueTIME)

    setState([...state , {id : id , text : text , time : TrueTIME ,bgColor : 0}])
    setId(id+1)
  }else{
    alert('Please Enter Your Task')
  }
  }

  const deleteTask = (id)=>{
    setState(state.filter((item)=>{
      return item.id !== id
    }))
  }

  const changeColorTRUE = (id)=>{
    console.log(state)
    let newState = state.map((item)=>{
      if(item.id === id){
        return {...item , bgColor : 1}
      }
      return item
    })
    setState(newState)
  }
  
  const changeColorFALSE = (id)=>{
    setState(state.map((item)=>{
      if(item.id === id){
        return {...item , bgColor : 2}
      }
      return item
    }))
  }


  return (
    <div className="App">
      <main className="App-main">
        <h2 className='header ' >To Do List</h2>

        <div className='intoContainer'>
        <input className='input-text' type="text" placeholder='Enter your task' ref={textInpute}/>
        <input className='input-time' type='time' placeholder='Enter time' ref={dateInpute}/>
        </div>

        <button className='btn' onClick={()=>handleClick()}>Add</button>

        <div className='Container-tasks'>
          {
            state.map((item)=>{
              return(
                <div className={item.bgColor === 2 ? 'task-false' : item.bgColor  === 1 ? 'task-true' : 'task'} key={item.id}>
                  <p className='task-time'>{item.time}</p>
                  <p className='task-text'>{item.text}</p>
                  <div className='task-icon'>
                  <i class="fa-solid fa-check true" onClick={() => changeColorTRUE(item.id)}></i>
                  <i class="fa-solid fa-xmark flase" onClick={() => changeColorFALSE(item.id)}></i>
                  <i class="fa-solid fa-trash-can delete" onClick={()=>deleteTask(item.id)}></i>
                  </div>
                </div>
              )
            })
          }
        </div>
      </main>
    </div>
  );
}

export default App;
