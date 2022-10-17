
const Dice = ({ values, id, isHeld, handleHeld, handleEndTime }) => {



    return (
        <div className="each-dice"
            onClick={() => {
                handleHeld(id);
              
            }}
           
            style={{
                backgroundColor: `${isHeld ? "#59E391" : ''}`
            }}
        >
            <h2>{values}</h2>
        </div>
    );
}


export default Dice;