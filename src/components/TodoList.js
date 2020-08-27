import React, { useEffect, useState } from 'react';
import '../styles/todo-list.css';

const TodoList = ( props ) => {

    const propsTasks = props.tasks;
    const [ tasks, setTasks ] = useState( [] );
    const [ markCompleted, setMarkCompleted ] = useState( false );

    useEffect( () => {
        setTasks( () => propsTasks );
    }, [ propsTasks ] );

    useEffect( () => {
        console.log( 'tasks', tasks.length );
        if( tasks.length > 0 ) {
            document.title = `${ tasks.length } tareas pendientes`;
        } else {
            document.title = 'No hay tareas';
        }
    }, [ tasks ] );

    useEffect( () => {
        console.log( 'cambio de estado a completado' );
    }, [ markCompleted ] );


    const handleAddTask = () => {
        const title = document.querySelector( '#titleTask' ).value;
        const completed = false;
        const newTask = {
            title,
            completed
        };
        setTasks( ( prevState ) => [
            ...prevState,
            newTask
        ] );
    };

    const handleCompleteTask = ( value ) => {
        const newTasks = tasks;
        newTasks[ value ].completed = true;
        setMarkCompleted( !markCompleted );
        setTasks( () => newTasks );
    };

    const handleRemoveTask = ( value ) => {
        const newTasks = tasks.filter( ( task, index ) => value !== index );
        setTasks( () => newTasks );
    };


    return (
        <div>
            <div>
                <label htmlFor='titleTask' style={{ color :"green" }}>Título de la tarea</label>
                <input type='text' id='titleTask' />
                <button onClick={ handleAddTask }>Añadir tarea</button>
                <h2  style={{ color :"red" }}>Lista de tareas ({ tasks.length }) en total</h2>
            </div>
            <table>
                <tbody>
                <tr style={{ color :"blue" }}>
                    <td><strong>Nombre</strong></td>
                    <td><strong>Estado</strong></td>
                    <td><strong>Eliminar</strong></td>
                </tr>
                {
                    tasks.map( ( task, index ) => (
                        <tr key={ `task-${ index }` }>
                            <td>{ task.title }</td>
                            <td>
                                <button className={task.completed ? 'completed':'notCompleted'}
                                        onClick={ () => {handleCompleteTask( index );} }
                                        disabled={ task.completed }>{ task.completed
                                    ? 'Completada'
                                    : 'Marcar como completada' }</button>
                            </td>
                            <td>
                                <button onClick={ () => {handleRemoveTask( index );} }>Eliminar</button>
                            </td>
                        </tr>
                    ) )
                }
                </tbody>
            </table>
        </div>
    );

};

export default TodoList;