import { useDispatch } from 'react-redux'
import { setCountries} from '../../../redux/actions';

export default function SubMenu(props){

    const {options, tp, nm}=props
    const dispatch = useDispatch()

    function setOrder (event){
        let query = `${event.target.value}=yes`
        console.log(query)
         dispatch(setCountries(query));
    }

    return (
        options.map(option =>{
            return(
            <li>
                <input type={tp} id={option.id} name={nm} value={option.id} onChange={setOrder}/>
                <label htmlFor={option.value}>{option.name}</label> 
            </li>
            )
        })
    )
}