// action.ts

type DataItem = {
  id: number;
  image?: string;  
  email: string;
  fullName: string;
  phone: string;
  address: string;
  gender: "male" | "female";
  age: number;
};


export const fetchData = async () => {
  const res = await fetch('/exam-2/exam-2.json'); 
  const json = await res.json();
  return json;
};

export const filterData = (
  data: DataItem[],
  search: string,
  genderFilter: string
) => {
  let filteredData = [...data];

 
  if (search) {
    filteredData = filteredData.filter(
      (item) =>
        (item.fullName && item.fullName.toLowerCase().includes(search.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(search.toLowerCase())) ||
        (item.phone && item.phone.includes(search))
    );
  }

  if (genderFilter) {
    filteredData = filteredData.filter((item) => item.gender === genderFilter);
  }

  return filteredData;
};



export const paginateData = (data: DataItem[], page: number, itemsPerPage: number): DataItem[] => {
  return data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
};

export const sortData = (
  data: DataItem[], 
  field: keyof DataItem, 
  order: "asc" | "desc"
): DataItem[] => {
  return [...data].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    // Check if the field is undefined and return 0 if either is undefined
    if (aValue === undefined || bValue === undefined) {
      return 0;
    }

    // Compare values based on the order
    if (aValue < bValue) return order === "asc" ? -1 : 1;
    if (aValue > bValue) return order === "asc" ? 1 : -1;
    return 0;
  });
};


