interface TargetNumberInterface {
    targetNumber: number;
}

function TargetNumber(props: TargetNumberInterface) {
    return <h2>{props.targetNumber}</h2>
}

export default TargetNumber;