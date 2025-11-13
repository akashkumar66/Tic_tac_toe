import { useState } from "react";
import Card from "../Card/Card";
import './Grid.css';
import isWinner from "../../helpers/checkWinner";

function Grid( {numberOfCards} ){
    const [Board, setBoard] = useState(Array( numberOfCards ).fill(""));
    const [turn, setTurn] = useState(true);
    const [winner, setWinner]=useState(null);

    function play(index){
        if(turn == true){
            Board[index]='o';
        }else{
            Board[index]='x';
        }

        const win=isWinner(Board, turn ? 'o' : 'x');
        if(win){
            setWinner(win);
        }

        setBoard([...Board]);
        setTurn(!turn);
    }
    function reset(){
        setBoard(Array( numberOfCards ).fill(""));
        setTurn(true);
        setWinner(null);
    }

    return (
        <div className="gridWrapper">
            {
                winner && (
                    <>
                    <h1 className="turn"> Winner is : {winner} </h1>
                    <button className="reset" onClick={reset}> Reset Game </button>
                    </>
                )
            }

            <h1 className="turn"> Current Trun : { (turn) ? 'o' : 'x' } </h1>
            <div className="grid">
            {Board.map((el, idx)=> <Card key={ idx } player={el} gameEnd={winner ? true : false} onPlay={play} index={idx} />)}
        </div>
        </div>
    )

}

export default Grid;