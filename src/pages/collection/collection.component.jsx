import React, { useContext} from 'react';
//import { connect } from 'react-redux';replacing redux with context API

import CollectionItem from '../../components/collection-item/collection-item.component';

//import { selectCollection } from '../../redux/shop/shop.selectors';
import CollectionsContext from '../../contexts/collections/collections.context';

import './collection.styles.scss';

//const CollectionPage = ({ collection }) => {
  //const { title, items } = collection;
// const CollectionPage = ({ match }) => { //1st way to use context API
//   return (
//     <CollectionsContext.Consumer>
//     {
//       collections => {
//         const collection = collections[match.params.collectionId];
//         const { title, items } = collection;
//         return (
//           <div className='collection-page'>
//             <h2 className='title'>{title}</h2>
//             <div className='items'>
//               {items.map(item => (
//                 <CollectionItem key={item.id} item={item} />
//               ))}
//             </div>
//           </div>
//         )
//       }
//     }
//     </CollectionsContext.Consumer>
//   );
// };

const CollectionPage = ({ match }) => { //2nd way to use context API using useContext
  const collections = useContext(CollectionsContext);
  const collection = collections[match.params.collectionId];
  const { title, items } = collection;
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// const mapStateToProps = (state, ownProps) => ({
//   collection: selectCollection(ownProps.match.params.collectionId)(state)
// });

// export default connect(mapStateToProps)(CollectionPage);
export default CollectionPage;
