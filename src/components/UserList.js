import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';

const UserList = () => {

    const [ user, setUser ] = useState( {} );
    const [ countUsers, setCountUsers ] = useState( 1 );
    const [ tasks, setTasks ] = useState( [] );

    useEffect( () => {
        fetch( `https://jsonplaceholder.typicode.com/users/${ countUsers }` ).then( ( data ) => {
            return data.json();
        } ).then( ( json ) => {
            console.log( 'json', json );
            setUser( () => json );
        } );
        fetch( `https://jsonplaceholder.typicode.com/users/${ countUsers }/todos` ).then( ( data ) => {
            return data.json();
        } ).then( ( json ) => {
            console.log( 'json', json );
            setTasks( () => json );
        } );
    }, [ countUsers ] );


    return (
        <div>
            <div>
                <button onClick={ () => setCountUsers( countUsers - 1 ) } hidden={ countUsers === 1 }>Anterior</button>
                <button onClick={ () => setCountUsers( countUsers + 1 ) } hidden={ countUsers >= 10 }>Siguiente</button>
            </div>
            <h2 style={{ color :"red" }}>Información del usuario</h2>
            <ul>
                <li><strong>Nombre: </strong>{ user.name }</li>
                <li><strong>Usuario: </strong>{ user.username }</li>
                <li><strong>Email: </strong>{ user.email }</li>
                <li><strong>Web: </strong>{ user.website }</li>
                <li><strong>Teléfono: </strong>{ user.phone }</li>
            </ul>
            <TodoList tasks={ tasks } />
        </div>
    );


};

export default UserList;