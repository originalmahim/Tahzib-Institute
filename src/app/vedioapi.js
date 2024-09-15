import { gql, request } from 'graphql-request';

const MASTER_URL = "https://api-ap-northeast-1.hygraph.com/v2/clxbmdobw00gw07w3igf7yg0p/master";

const getCourses = async () => {
  const query = gql`
    query Courses {
  courses {
    courseName
    id
    price
    tags
    time
    author
    bannerImage {
      url
    }
    description {
      text
    }
    chapters {
      id
      title
      content {
        id
        description {
          text
        }
        title
         demovedio
         vediolink
      }
    }
    
  }
}
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  getCourses
};
