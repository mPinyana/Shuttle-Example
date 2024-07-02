import matplotlib.pyplot as plt

n_terms = 1000  # Number of terms to consider
partial_sums = []
current_sum = 0

for n in range(1, n_terms + 1):
    current_sum += 1 / n
    partial_sums.append(current_sum)

# Plotting
plt.figure(figsize=(10, 6))
plt.plot(range(1, n_terms + 1), partial_sums, label='Partial Sums of Harmonic Series', color='blue')
plt.xlabel('Number of Terms (n)')
plt.ylabel('Partial Sum (S_n)')
plt.title('Divergence of Harmonic Series')
plt.grid(True)
plt.legend()
plt.show()
