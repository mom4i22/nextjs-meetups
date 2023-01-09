import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "first meetup",
//     image:
//       "https://www.bain.com/contentassets/2ef1050396df402f80c83c3d12c46686/local-office-images-berlin-1440x810.jpg",
//     address: "Some address 5,12345, some city",
//     description: "first meetup",
//   },
//   {
//     id: "m2",
//     title: "second meetup",
//     image:
//       "https://www.bain.com/contentassets/2ef1050396df402f80c83c3d12c46686/local-office-images-berlin-1440x810.jpg",
//     address: "Some address 6,12345, some city",
//     description: "second meetup",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Next Meetups</title>
        <meta
          name="description"
          content="Browse a huge amount of available meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const request = context.req;
//   const response = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://mom4i22:Trenchev696901@cluster0.s9u7skb.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          id: meetup._id.toString(),
          image: meetup.image,
          title: meetup.title,
          description: meetup.description,
          address: meetup.address,
        };
      }),
    },
    revalidate: 10,
  };
}

export default HomePage;
