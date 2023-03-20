// import { useQuery, useMutation } from '@apollo/client';
// import { useParams, Link } from 'react-router-dom';
// import { CREATE_LIKE, DELETE_LIKE } from '../utils/mutations';
// import { useQuery, profiles  } from '../Profile.js';
// import { QUERY_PROFILES } from '../utils/queries';

// const Like = () => {
//     let { id } = useParams();
//     const { loading, data } = useQuery(QUERY_PROFILES, {
//         variables: { _id: id },
//       });
    
//       const profile = data?.profiles || [];
    
//       const [createLike, { error }] = useMutation(CREATE_LIKE);
    
//       const handleLike = async (techNum) => {
//         try {
//           await createLike({
//             variables: { _id: id, techNum: techNum },
//           });
//         } catch (err) {
//           console.error(err);
//         }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await saveLike({
//         variables: {
//           answers: Object.keys(Like).map((questionKey) => Likes[questionKey].answer)
//         }
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };
//   const Dislike = () => {
//     let { id } = useParams();
//     const { loading, data } = useQuery(QUERY_PROFILES, {
//         variables: { _id: id },
//       });
    
//       const profile = data?.profiles || [];
    
//       const [deleteLike, { error }] = useMutation(DELETE_LIKE);
    
//       const handleDislike = async (techNum) => {
//         try {
//           await deleteLike({
//             variables: { _id: id, techNum: techNum },
//           });
//         } catch (err) {
//           console.error(err);
//         }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await saveDislike({
//         variables: {
//           answers: Object.keys(Dislike).map((questionKey) => Dislikes[questionKey].answer)
//         }
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };
//   return (
//     <div className="card bg-white card-rounded w-50">
//       <div className="card-header bg-dark text-center">
//         <h1>Here are your likes!</h1>
//       </div>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="card-body text-center mt-3">
//           <h2>
//             {Likes[0].tech1} vs. {matchup[0].tech2}
//           </h2>
//           <h3>
//             {Like[0].tech1_likes} : {Dislike[0].tech2_dislike}
//           </h3>
//           {/* <button className="btn btn-info" onClick={() => handleVote(1)}>
//             Vote for {matchup[0].tech1}
//           </button>{' '}
//           <button className="btn btn-info" onClick={() => handleVote(2)}>
//             Vote for {matchup[0].tech2}
//           </button> */}
//           <div className="card-footer text-center m-3">
//             <br></br>
//             <Link to="/">
//               <button className="btn btn-lg btn-danger">
//                 View all likes
//               </button>
//             </Link>
//           </div>
//         </div>
//       )}
//       {error && <div>Something went wrong...</div>}
//     </div>
//   );
// };
// }};

//       export default Likes;