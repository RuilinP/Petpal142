import '../styles/custom.css'
import '../styles/main.css'
import '../styles/fix-pos-icon.css'
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import BlogUpdate from '../../components/Blog/BlogUpdate';

function BlogUpdatePage() {

    return (
        <div className='bg-secondary'>
            <Header/>
            <main className="bg-secondary">
                <div className="container white-container p-3 mt-sm-4 mb-sm-4">
                    <BlogUpdate />  
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default BlogUpdatePage;
