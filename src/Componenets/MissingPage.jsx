import { Link } from 'react-router-dom';

const MissingPage = () => {
  return (
    <main  className="MissingPage">
        <h2> No country found! </h2>
        <p>Well, It's disappointing</p>
        <p>
            <Link to='/' className='MissingLink'>
                Visit our Homepage
            </Link>
        </p>
      </main>
  )
};

export default MissingPage;