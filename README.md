# Chicken Grade Analyzer

A web application for analyzing and managing student grades with Excel export functionality.

## Features

- Import student grade data
- Export grade data to Excel with custom column headers
- Grade analysis and visualization
- Modern UI with responsive design

## Tech Stack

- TypeScript
- React
- Vite
- XLSX for Excel handling
- TailwindCSS for styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NinelXram/chicken-grade-analyzer.git
cd chicken-grade-analyzer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Usage

1. Import your grade data
2. View and analyze the grades
3. Export to Excel with custom column headers:
   - STT (Student Number)
   - Họ và Tên (Full Name)
   - Ngày sinh (Date of Birth)
   - Lớp (Class)
   - Đ.KT (Mid-term Grade)
   - Đ.GK (Quarter Grade)
   - Đ.Thi (Final Grade)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
