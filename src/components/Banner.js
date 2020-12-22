function Banner(props){
    const { setBannerShow } = props;

    return (
        <div className="banner">
            <p>Thank you for nominating your favourite movies!</p>
            <p>You can update your nominations until January 17th 2021.</p>
            <button
                onClick={() => {setBannerShow(false)}}
                >
                Submit Nominations</button>
            <button
                onClick={() => {setBannerShow(false)}}
                >
                Submit Later</button>
        </div>
    )
}

export default Banner;