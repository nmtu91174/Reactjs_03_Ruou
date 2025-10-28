export function useOrderStorage() {
  const saveOrder = (orderData) => {
    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    // Lưu danh sách order (nếu bạn muốn thêm tính năng “Lịch sử đơn hàng”)
    const existingOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    existingOrders.push(orderData);
    localStorage.setItem("orderHistory", JSON.stringify(existingOrders));
  };

  const getLastOrder = () => {
    try {
      return JSON.parse(localStorage.getItem("lastOrder"));
    } catch {
      return null;
    }
  };

  const getOrderHistory = () => {
    try {
      return JSON.parse(localStorage.getItem("orderHistory")) || [];
    } catch {
      return [];
    }
  };

  const clearOrders = () => {
    localStorage.removeItem("orderHistory");
  };

  return { saveOrder, getLastOrder, getOrderHistory, clearOrders };
}
