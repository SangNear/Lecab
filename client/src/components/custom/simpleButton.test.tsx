import { render, screen } from '@testing-library/react';
import { SimpleButton } from './simpleButton';
import '@testing-library/jest-dom'; // Cung cấp các hàm so sánh như toBeInTheDocument

describe('SimpleButton Component', () => {
  test('nên hiển thị đúng tiêu đề được truyền vào', () => {
    // 1. Render component ra môi trường giả lập
    render(<SimpleButton title="Học từ vựng" />);

    // 2. Tìm cái nút dựa trên text hiển thị
    const buttonElement = screen.getByText(/Học từ vựng/i);

    // 3. Kiểm tra xem nó có tồn tại trên màn hình không
    expect(buttonElement).toBeInTheDocument();
  });
});