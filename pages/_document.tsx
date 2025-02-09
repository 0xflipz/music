import { Html, Head } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </Head>
        {/* ... rest of your document code ... */}
      </Html>
    );
  }
}

export default MyDocument; 