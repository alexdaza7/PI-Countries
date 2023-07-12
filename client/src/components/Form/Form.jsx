import react, {useState} from 'react';
import axios from 'axios';
import styles from './Form.module.css'

export default function Form(){

    const [newActivity, setNewActivity]=useState({
        name:'',
        dificulty:0,
        duration:'',
        season:'',
        // ids:[],
    })

    const sendData = async (newActivity) =>{
        
            console.log(newActivity)
            const send = await axios.post('http://localhost:3001/activities',newActivity)
            console.log(send.data)
            
        
        //  catch (error) {
        //     throw Error(error.message)
        // }
    }

    const handleInputChange = (event)=>{
        setNewActivity({
            ...newActivity,
            [event.target.name]: event.target.value
        })
        console.log(newActivity)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(newActivity)
        console.log('esta entrando')
        sendData(newActivity)
    }

    return(

        <form action="">

            <label htmlFor="name" className={styles.textBox}>Activity name</label>
            <input 
                id='name' 
                name='name' 
                placeholder="Digita el nombre de la actividad"
                type="text" 
                value={newActivity.name}
                onChange={handleInputChange}
            />
            <br />

            <label htmlFor="dificulty" className={styles.textBox}>dificulty</label>
            <input 
                id='dificulty' 
                name='dificulty' 
                placeholder=" 0 - 5 "
                type="text" 
                value={newActivity.dificulty}
                onChange={handleInputChange}
            />
            <br />

            <label htmlFor="duration" className={styles.textBox}>duration</label>
            <input 
                id='duration' 
                name='duration' 
                placeholder=" Example 09:00:00 "
                type="text" 
                value={newActivity.duration}
                onChange={handleInputChange}
            />
            <br />

            <label htmlFor="season" className={styles.textBox}>season</label>
            <input 
                id='season' 
                name='season' 
                placeholder=" Verano, Otoño... "
                type="text" 
                value={newActivity.season}
                onChange={handleInputChange}
            />
            <br />
            
            {/* <label htmlFor="ids" className={styles.textBox}>ids</label>
            <input 
                id='ids' 
                name='ids' 
                placeholder="Example ['COL', 'PER', 'USA']"
                type="text" 
                value={newActivity.ids}
                onChange={handleInputChange}
            />
            <br /> */}
            <button style={{cursor:'pointer'}} onClick={handleSubmit}>CREATE</button>
        </form>
    )
}