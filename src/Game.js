const Game = ({diceElement, allNewDices, checkIsHeld, tenzies, startAgain} ) => {

    return ( 
        <div>
            <div className="dices" >
            {diceElement}
            </div>
                <div className="row">
            <button className="roll" onClick={() => {
                return tenzies ? allNewDices() : checkIsHeld();
            }} style={{ marginRight: '15px' }}>{`${tenzies ? 'New Game' : 'Roll'}`}</button>
            <button className="roll" onClick={() => {
                allNewDices();
                startAgain();
            }}>Start Again</button>
                </div>
                {tenzies && <h2 style={{
            marginTop: '10px',
            transition: 'all 0.3s'
                }}>You won!</h2>}
        </div>
     );
}

 
export default Game;