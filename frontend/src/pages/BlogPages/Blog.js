import '../styles/custom.css'
import '../styles/main.css'
import '../styles/fix-pos-icon.css'
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import Blog from '../../components/Blog/Blog';

function BlogPage() {

    return (
        <div className='bg-secondary'>
            <Header/>
            <main className="bg-secondary">
                <div className="container white-container p-3 mt-sm-4 mb-sm-4">
                    <Blog />  
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default BlogPage;
