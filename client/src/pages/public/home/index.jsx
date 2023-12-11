import styles from './Home.module.scss'

function Home() {
    return (
        <>
            <div className={styles.homeBgColor}>
                <div className='grid grid-cols-3 h-full'>
                    <div className="">
                        <div className={styles.titleWelcome}>Welcome to 4BEST SHOP</div>
                        <div className={styles.contentWelcome}>Sequi perspiciatis nulla reiciendis, rem, tenetur impedit, eveniet non necessitatibus error distinctio mollitia suscipit. Nostrum fugit doloribus consequatur distinctio esse, possimus maiores aliquid repellat beatae cum, perspiciatis enim, accusantium perferendis.</div>
                        
                    </div>
                    <div className="col-span-2"></div>
                </div>
            </div>
            abc
        </>
    );
}

export default Home;
