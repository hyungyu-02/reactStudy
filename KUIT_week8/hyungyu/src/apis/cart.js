export const getCart = async () => {
    const response = await fetch("http://localhost:8080/cart");
    const data = await response.json();
    return data;
};

export const getMenusFrom = async () => {
  // const response = await fetch("http://localhost:8080/cart");
  // const data = await response.json();
  // return data;
};


export const updateMenusFrom = async (updatedMenusFrom) => {
  try {
      const response = await fetch("http://localhost:8080/menusFrom", {
        method: "PATCH", // 기존 데이터 업데이트
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedMenusFrom }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update cart: ${response.statusText}`);
      }
      console.log("Cart updated successfully!");
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
};

export const updateCart = async (updatedMenus) => {
    try {
        const response = await fetch("http://localhost:8080/cart", {
          method: "PATCH", // 기존 데이터 업데이트
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedMenus }),
        });
        if (!response.ok) {
          throw new Error(`Failed to update cart: ${response.statusText}`);
        }
        console.log("Cart updated successfully!");
      } catch (error) {
        console.error("Error updating cart:", error.message);
      }
};