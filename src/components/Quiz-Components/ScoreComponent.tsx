interface ScoreProps {
    score: number
 }

function ScoreComponent (props: ScoreProps) {
return <h2>Your score is {props.score}</h2>
}

export default ScoreComponent