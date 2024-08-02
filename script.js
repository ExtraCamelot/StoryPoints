document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".btn");
    const totalPointsEl = document.getElementById("totalPoints");
    const recommendationEl = document.getElementById("recommendation");

    let selectedValues = {
        uncertainty: 1,
        complexity: 1,
        volume: 1,
        interaction: 1,
        research: 1,
        risk: 1
    };

    const fibonacci = [1, 2, 3, 5, 8, 13, 21];

    document.querySelectorAll('.btn[data-value="1"]').forEach(button => {
        button.classList.add('active');
    });

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");
            const value = parseInt(button.getAttribute("data-value"));

            selectedValues[category] = value;

            buttons.forEach(btn => {
                if (btn.getAttribute("data-category") === category) {
                    btn.classList.remove("active");
                }
            });

            button.classList.add("active");

            calculateStoryPoints();
        });
    });

    function calculateStoryPoints() {
        const totalValue = Object.values(selectedValues).reduce((acc, val) => acc + val, 0);
        const adjustedTotal = Math.min(totalValue, 6 + fibonacci.length - 1); // Ограничение в пределах чисел Фибоначчи
        const storyPoints = fibonacci[adjustedTotal - 6]; // 6 вычитаю, так как минимальная сумма значений критериев (6) должна соответствовать первому числу в массиве

        totalPointsEl.textContent = storyPoints;
        recommendationEl.textContent = getRecommendation(storyPoints);
    }

    function getRecommendation(storyPoints) {
        if (storyPoints === 1) return "Очень лёгкая быстрая задача.";
        if (storyPoints === 2 || storyPoints === 3) return "Обычная задача, не очень сложная.";
        if (storyPoints === 5) return "Рекомендация по декомпозиции.";
        if (storyPoints === 8) return "Уже точно надо декомпозировать.";
        if (storyPoints >= 13) return "Не эпик ли эта задача?";
        return "";
    }

    calculateStoryPoints();
});
