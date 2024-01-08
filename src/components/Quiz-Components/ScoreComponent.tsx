interface ScoreProps {
    score: number
 }

function ScoreComponent (props: ScoreProps) {
return <h2>Your score is {props.score}/5</h2>
}

export default ScoreComponent