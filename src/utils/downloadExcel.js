import axiosInstance from '../utils/axios';

export const downloadTaskExcel = async ({ baseUrl, mode, username }) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/api/tasks/export`, {
      params: { mode, username },
      responseType: 'blob',
    });

    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');

    const fileName = `${mode}task_${dd}_${mm}_${yy}_${hh}_${min}.xlsx`;

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Download failed', err);
  }
};
