<?php

use PHPUnit\Framework\TestCase;

class SimpleTest extends TestCase
{
    public function test_true_is_true()
    {
        $this->assertTrue(true);
    }

    public function test_header_file_exists()
    {
        $this->assertFileExists('templates/header.php');
    }
}