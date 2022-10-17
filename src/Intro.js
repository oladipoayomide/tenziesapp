import { Ref } from "react";

const Intro = ({ handleIntro, handleChange, playerName, startAgain }) => {


    return (
        <form >
            <input type="text" name="playerName" placeholder="Player's Name"
                onChange={(e) => { handleChange(e) }}
                value={playerName}
                required

            />
            <br />
            <button className="roll" onClick={() => {
                if (playerName) {
                    handleIntro()
                    startAgain()
                }
            }} >Enter Game</button>

        </form>
    );
}

export default Intro;