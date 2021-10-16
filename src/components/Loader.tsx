const Loader = () => {
    return(
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div className="lds-heart">
                <div></div>
            </div>
        </div>
    )
}

export {
    Loader
}