<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    public function definition(): array
    {

        $createdAt = $this->faker->dateTimeBetween('-1 year', 'now');

        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'situacao' => fake()->randomElement([0, 1]),
            'data_admissao' => $this->faker->dateTimeBetween($createdAt, 'now'),
            'created_at' => $createdAt,
            'updated_at' => $this->faker->dateTimeBetween($createdAt, 'now'),
        ];
    }
}
