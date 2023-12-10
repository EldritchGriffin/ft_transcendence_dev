    export default async function getData() {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
          console.log("datatatattat",res)
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
       

        return  res.json();
      }