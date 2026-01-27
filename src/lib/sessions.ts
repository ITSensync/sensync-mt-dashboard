import Cookies from "js-cookie";

export function deleteSession() {
  Cookies.remove("auth_token");
  return true
}

export async function getAuthToken() {
  const authToken = Cookies.get('auth_token')
  if (authToken) {
    return {
      Authorization: `Bearer ${authToken}`,
    };
  }
}

export async function getIdDevice() {
  const id = Cookies.get('id_device')
  if (id) {
    return id
  }
}
