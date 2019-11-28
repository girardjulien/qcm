import React from 'react';

const questions = [
    "Est-ce que React est une librairie JS pour développer des Web App côté Front ?",
    "Est-ce que JS est un langage purement fonctionnel ?",
    "question 3 ?",
    "question 4 ?",
    "question 5 ?"
];

const reponses = [
    "true",
    "false",
    "false",
    "true",
    "false"
];

const initialState = {
    title: questions[0],
    numQuestion: 1,
    reponsesUser: [
        null, null, null, null, null
    ],
    explicationsReponses: [],
    points: 0
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'VERIF':
            state.reponsesUser[state.numQuestion-1] = action.reponse;
            const explicationsReponsesCopy = [...state.explicationsReponses];
            for (var i = 0; i < 5; i++) {
                console.log(reponses[i]);
                console.log(state.reponsesUser[i]);
                if (state.reponsesUser[i] == reponses[i]) {
                    state.points++;
                    explicationsReponsesCopy.push("Bonne réponse")
                } else {
                    explicationsReponsesCopy.push("Mauvaise réponse")
                }
            }
            console.log(state.explicationsReponsesCopy);
            return {
                ...state,
                numQuestion: state.numQuestion + 1,
                title: "Test fini",
                reponsesUser: state.reponsesUser,
                points: state.points,
                explicationsReponses: explicationsReponsesCopy
            }
        case 'NEXT':

            console.log(state);

            state.reponsesUser[state.numQuestion-1] = action.reponse;

            return {
                ...state,
                numQuestion: state.numQuestion + 1,
                title: questions[state.numQuestion],
                reponsesUser: state.reponsesUser
            }

        case 'RESET':
            return {
                ...initialState
            }
        default:
            return state;    
    }
}

const Questions = () => {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.name == 5) {
            dispatch({ type: 'VERIF', question: e.target.name, reponse: e.target.value })
        } else {
            dispatch({ type: 'NEXT', question: e.target.name, reponse: e.target.value })
        }
    }

    const handleReset = (e) => {
        e.preventDefault();
        dispatch({ type: 'RESET'})
    }

    return (
        <div>
            <h1>{state.title}</h1>
            {state.numQuestion < 6 && <p>{state.numQuestion}/5</p>}
            {state.numQuestion < 6 && <button onClick={handleClick} name={state.numQuestion} value="true">True</button>}
            {state.numQuestion < 6 && <button onClick={handleClick} name={state.numQuestion} value="false">False</button>}
            {state.explicationsReponses.length != 0 && <h2>Points : {state.points}</h2>}
            {state.explicationsReponses.length != 0 && <div>
                {state.explicationsReponses.map((value,index) => (
                    <p key={index}>{questions[index]} : {value}</p>
                ))}
            </div>}
            <br/>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
}

export default Questions;