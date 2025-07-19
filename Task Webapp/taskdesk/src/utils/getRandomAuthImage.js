export const getRandomAuthImage = () => {
  const randomIndex = Math.floor(Math.random() * 11) + 1; // 1 to 11
  return `https://ik.imagekit.io/rhzh8en76/TaskDesk/AuthImages/${randomIndex}.jpeg?updatedAt=1752919886705`;
};
