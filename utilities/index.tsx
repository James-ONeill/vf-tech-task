export const getInitials = (name: string): string => {
  const splitName = name.split(" ")
  return [splitName[0].charAt(0), splitName[1].charAt(0)].join("")
}
