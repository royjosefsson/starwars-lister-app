interface StarsProps {
    amount: number
}

const Stars = (props: StarsProps) => {
    const { amount } = props
    if (amount === 0) {
        return (
            <div className="stars" />
        )
    }
    return (
        <div className="stars">
            {Array.from(Array(amount).keys()).map(number => (
                <div key={`active-${number}`} className="stars__star">★</div>
            ))}
            {Array.from(Array(10 - amount).keys()).map(number => (
                <div key={`outlined-${number}`} className="stars__star stars__star--outlined">☆</div>
            ))}
        </div>
    )
}

export default Stars