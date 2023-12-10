// {
//     "id": 1,
//     "name": "Leanne Graham",
//     "username": "Bret",
//     "email": "Sincere@april.biz",
//     "address": {
//       "street": "Kulas Light",
//       "suite": "Apt. 556",
//       "city": "Gwenborough",
//       "zipcode": "92998-3874",
//       "geo": {
//         "lat": "-37.3159",
//         "lng": "81.1496"
//       }
//     },
//     "phone": "1-770-736-8031 x56442",
//     "website": "hildegard.org",
//     "company": {
//       "name": "Romaguera-Crona",
//       "catchPhrase": "Multi-layered client-server neural-net",
//       "bs": "harness real-time e-markets"
//     }
// }

// {
//     "user_name": "SCAYHO",
//     "channels_list": [
//         {
//             "channel_name": "JAHAD_ARMY",
//             "channel_id": 1,
//             "channel_password": "JAHAD_TRUE_KING",
//             "channel_role": "ADMIN",
//             "channel_mutes": "FALSE",
//             "channel_banned": "FALSE"
//         },
//         {
//             "channel_name": "FUG_TROOPS",
//             "channel_id": 2,
//             "channel_password": "JAHAD_FALSE_GOD",
//             "channel_role": "ADMIN",
//             "channel_mutes": "FALSE",
//             "channel_banned": "FALSE"
//         },
//         {
//             "channel_name": "ZWAML",
//             "channel_id": 3,
//             "channel_password": "ZEBI_KBIR",
//             "channel_role": "MEMBER",
//             "channel_mutes": "TRUE",
//             "channel_banned": "TRUE"
//         }
//     ]
// }



// // MyTable.js
// import { useState } from 'react';

// const MyTable = () => {
//   // Sample data
//   const initialData = [
//     { id: 1, user_name: 'scayho', target_channel_user: 'user', message: 'zebi kebir', target_id: '5' },
//     // Add more initial data as needed
//   ];

//   const [tableData, setTableData] = useState(initialData);

//   // Function to update the data
//   const updateData = (id, field, value) => {
//     setTableData((prevData) =>
//       prevData.map((item) => (item.id === id ? { ...item, [field]: value } : item))
//     );
//   };

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>User Name</th>
//           <th>Target Channel User</th>
//           <th>Message</th>
//           <th>Target ID</th>
//         </tr>
//       </thead>
//       <tbody>
//         {tableData.map((item) => (
//           <tr key={item.id}>
//             <td>
//               <input
//                 type="text"
//                 value={item.user_name}
//                 onChange={(e) => updateData(item.id, 'user_name', e.target.value)}
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 value={item.target_channel_user}
//                 onChange={(e) => updateData(item.id, 'target_channel_user', e.target.value)}
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 value={item.message}
//                 onChange={(e) => updateData(item.id, 'message', e.target.value)}
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 value={item.target_id}
//                 onChange={(e) => updateData(item.id, 'target_id', e.target.value)}
//               />
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default MyTable;








// {
//   "user_name": "scayho",
//   "target_channel_user": "user",
//   "message": "zebi kebir",
//   "target_id": "5"
// }







#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
int ft_strlen(const char *s)
{
  int i = 0;
  while (s[i] != '\0')
    i++;
  return i;
}



char *ft_strdup(const char *s)
{
  int count;
  void *str= NULL;
  char *str= (char *)0; 
  int i = 0;

  if (!s)
    return NULL;
  count = ft_strlen(s);
  str = malloc(ft_strlen(s) + 1);
  if (!str)
    return (NULL);
  while(s && i < count)
  {
    str[i] = s[i];
    i++;
  }
  return str;
}

int main()
{
  //char *s = "hello world";
  printf("[%s]\n", ft_strdup("salam 3lach lkar majach men fess"));
  return (-1);
}