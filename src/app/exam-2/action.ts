// action.ts

type DataItem = {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  gender: "male" | "female";
  age: number;
};


export const fetchData = async () => {
  const res = await fetch('/exam-2/exam-2.json');  // ลบ '/public' ออก
  const json = await res.json();
  return json;
};

export const filterData = (
  data: DataItem[],
  search: string,
  genderFilter: string
) => {
  let filteredData = [...data];

  // Filter by search (email, fullName, or phone)
  if (search) {
    filteredData = filteredData.filter(
      (item) =>
        (item.fullName && item.fullName.toLowerCase().includes(search.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(search.toLowerCase())) ||
        (item.phone && item.phone.includes(search))
    );
  }

  // Filter by gender
  if (genderFilter) {
    filteredData = filteredData.filter((item) => item.gender === genderFilter);
  }

  return filteredData;
};



export const paginateData = (data: DataItem[], page: number, itemsPerPage: number): DataItem[] => {
  return data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
};

export const sortData = (data: DataItem[], field: keyof DataItem, order: "asc" | "desc"): DataItem[] => {
  return [...data].sort((a, b) => {
    if (a[field] < b[field]) return order === "asc" ? -1 : 1;
    if (a[field] > b[field]) return order === "asc" ? 1 : -1;
    return 0;
  });
};

