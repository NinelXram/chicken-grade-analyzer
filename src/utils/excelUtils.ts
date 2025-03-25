import * as XLSX from 'xlsx';

export interface GradeData {
  studentName?: string;
  studentId?: string;
  subject?: string;
  grade?: string | number;
  [key: string]: any;
}

// Tạo object mapping cho tên cột
const columnMapping: { [key: string]: string } = {
  stt: 'STT',
  name: 'Họ và Tên',
  dob: 'Ngày sinh',
  class: 'Lớp',
  dKt: 'Đ.KT',
  dGk: 'Đ.GK',
  dThi: 'Đ.Thi'
};

export const generateExcel = (data: GradeData[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data.map(item => {
    const newItem: Record<string, any> = {};
    Object.keys(item).forEach(key => {
      newItem[columnMapping[key] || key] = item[key];
    });
    return newItem;
  }));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Grades');
  
  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  // Create download link
  const fileName = `grades_${new Date().toISOString().split('T')[0]}.xlsx`;
  return { blob: dataBlob, fileName };
}; 