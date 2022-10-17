import Dice from "./Dice";
import { useRef, useState } from "react";
import { useEffect } from "react";
import Confetti from 'react-confetti'
import Intro from "./Intro";
import Game from "./Game";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'



const Main = () => {
    const [newNums, setNewNums] = useState([])
    const [isReady, setIsReady] = useState(false)
    const [tenzies, setTenzies] = useState(false);
    const [timerState, setTimerState] = useState(false)
    const [score, setScore] = useState(50)
    const [rolls, setRolls] = useState(0)
    const height = window.innerHeight;
    const width = window.innerWidth;
    const [min, setMin] = useState(0)
    const [sec, setSec] = useState(0)
    const [lowestRolls, setLowestRolls] = useState(100)
    const [contIntro, setContIntro] = useState(true)
    const playerValue = useRef()
    const [formData, setFormData] = useState({
        playerName: ''
    })


    const handleRollsCount = () => {
        setRolls(rolls + 1)
    }

    const startAgain = () => {
        setMin(0)
        setSec(0)
        setTimerState(true)
    }

    useEffect(() => {

        const allTrue = newNums.every(item => item.isHeld);

        if (isReady) {
            var firstDice = newNums[0].values;
        }

        const allValueTrue = newNums.every(item => firstDice === item.values)


        if (allTrue && allValueTrue) {
            setTenzies(true)
        }




    }, [newNums, isReady,])

    useEffect(() => {
        rollDice();
        allNewDices();

    }, [])


    useEffect(() => {

        if (timerState) {
            var timer = setInterval(() => {
                setSec(prevState => prevState + 1)
                if (sec === 59) {
                    setSec(0)
                    setMin(min + 1)
                }
            }, 1000);

            if (tenzies) {
                clearInterval(timer)

                if (sec < score) {
                    window.localStorage.setItem('score', JSON.stringify({ sec }))
                    setScore(JSON.parse(window.localStorage.getItem('score')).sec)
                }
                if (rolls < lowestRolls) {
                    window.localStorage.setItem('rolls', JSON.stringify(rolls))
                    setLowestRolls(JSON.parse(window.localStorage.getItem('rolls')))

                }
            }
            return () => clearInterval(timer)
        }


    }, [sec, min, timerState])

    const handleIntro = () => {
        setContIntro(false)
    }


    const rollDice = () => {
        const numArray = []

        for (let i = 1; i <= 10; i++) {
            numArray.push({ values: Math.ceil(Math.random() * 6), isHeld: false, id: i });
        }

        return numArray
    }
    const allNewDices = () => {
        setNewNums(rollDice());
        setIsReady(true)
        setTenzies(false)
        setMin(0);
        setSec(0)
        setRolls(0);



    }

    const checkIsHeld = () => {
        setNewNums(prevData => prevData.map((item) => {
            return !item.isHeld ? { ...item, values: Math.ceil((Math.random() * 6)) } : item
        }))
        handleRollsCount()

    }



    const handleHeld = (id) => {
        setNewNums(prevData => prevData.map((item) => {
            return id === item.id ? { ...item, isHeld: !item.isHeld } : item
        }))
    }



    const diceElement = newNums.map((item) => { return <Dice values={item.values} isHeld={item.isHeld} key={item.id} id={item.id} handleHeld={handleHeld} checkIsHeld={checkIsHeld} /> })


    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData(prevData => {
            return {
                ...prevData, [name]: value
            }
        })
    }








    return (
        <div>
            <div className="timer">
                {!contIntro && <FontAwesomeIcon icon={faAnglesLeft} className='text-shadow'
                    style={{
                        width: '45%',
                        cursor: 'pointer',

                    }}
                    onClick={() => {
                        setContIntro(true)
                        setTimerState(false)
                        setTenzies(false)
                        setMin(0)
                        setSec(0)
                        allNewDices()
                        setFormData(prevState=>{
                            return {...prevState, playerName: ''}
                        })
                    }} />}
                <div>
                    <h3>Timer</h3>
                    <h3>{min < 10 ? '0' + min : min} : {sec < 10 ? '0' + sec : sec}</h3>
                </div>
            </div>
            <div className="container">
                {tenzies && <Confetti
                    width={width}
                    height={height}
                />}
                <div className="content">
                    {contIntro ? <h3 style={{
                        marginBottom: '5px'

                    }}>Tenzies</h3> : <h3
                        style={{
                            marginBottom: '5px',
                            padding: '0 10px'
                        }}
                    >
                        Welcome {formData.playerName} to Tenzies.
                    </h3>}
                    <p style={{ padding: '0 10px' }}>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

                    {!contIntro && <Game
                        diceElement={diceElement}
                        allNewDices={allNewDices}
                        checkIsHeld={checkIsHeld}
                        tenzies={tenzies}
                        startAgain={startAgain}
                        
                    />}

                    {contIntro && <Intro

                        handleIntro={handleIntro}
                        handleChange={handleChange}
                        playerName={formData.playerName}
                        startAgain={startAgain}
                    />}
                </div>

            </div>
            <div className="scores" style={{
                marginTop: '5px',
                backgroundColor: '#0B2434',
                color: 'white',
                padding: '10px',
                textAlign: 'center'

            }}>

                {tenzies && <p>Your time taken is: {min !== 0 ? min + ' min' : ''}  {sec}s</p>}
                <p>Lowest time achieved:<strong> {score ? score + 's' : ''}</strong> </p>
                <p>No of Rolls made: <strong>{rolls}</strong></p>
                <p>Lowest Rolls achieved: <strong>{lowestRolls}</strong></p>

            </div>



            <p className="footer"><a href="https://www.linkedin.com/in/oladipoayomide/" target="_blank" rel="noreferral noopener">Oladipo Ayomide</a>, 2022</p>

        </div>

    );
}

export default Main;